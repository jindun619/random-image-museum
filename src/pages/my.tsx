import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";

import { Session } from "@supabase/supabase-js";
import { Artwork } from "@/components/Artwork";

interface Artwork {
  authorId: string;
  authorNickname: string;
  desc: string;
  id: number;
  title: string;
}

export default function MyPage() {
  const router = useRouter();

  const [session, setSession] = useState<Session | null>();
  const [myArtworks, setMyArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setSession(data.session);
      } else {
        router.push("/signin");
      }
    })();
  }, []);

  useEffect(() => {
    if (session) {
      (async () => {
        const { data } = await supabase
          .from("artworks")
          .select()
          .eq("authorId", session.user.id);
        if (data) {
          setMyArtworks(data);
        }
      })();
    }
  }, [session]);

  return (
    <div className="flex justify-center mt-5">
      <div>
        <h1 className="text-center text-3xl font-semibold text-gray-700">
          내 작품
        </h1>
        {myArtworks.map((v, i) => (
          <div key={i} className="mt-5">
            <Artwork
              src={`https://mxuynnjexrmtnwewutpx.supabase.co/storage/v1/object/public/images/public/${v.authorId}_${v.id}`}
              title={v.title}
              author={v.authorNickname}
              desc={v.desc}
              deleteBtn={{id: v.id, authorId: v.authorId}}  //artwork id를 parameter로 넘겨줌
            />
          </div>
        ))}
      </div>
    </div>
  );
}
