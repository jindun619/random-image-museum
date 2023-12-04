import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

export default function IndexPage() {
  (async () => {
    const { data, error } = await supabase.from("notes").select();
    console.log(data, error);
  })();
  return <h1>hi</h1>;import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

export default function IndexPage() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("notes").select();
        if (error) {
          setError(error.message || "An error occurred");
        } else {
          setNotes(data || []);
        }
      } catch (error) {
        setError(error.message || "An error occurred");
      }
    };

    fetchData();
  }, []); // 빈 배열은 컴포넌트 마운트 시에만 실행되도록 합니다.

  return (
    <>
      {error && <p>Error: {error}</p>}
      <h1>hi</h1>
      {/* 여기에서 notes 상태를 사용하여 렌더링 로직을 추가하세요 */}
    </>
  );
}

}
