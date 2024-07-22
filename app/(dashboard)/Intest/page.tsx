import Card from "@/_components/UI/card";
import Comment from "@/_components/UI/comment/comment";
import CommentList from "@/_components/UI/comment/commentList";

export default function Intest() {
  const comments = Array.from({ length: 10 }).map((_, index) => {
    return {
      id: `${index}`,
      content: `评论${index}`,
    };
  });
  return (
    <>
      <Card>
        <CommentList comments={comments} />
      </Card>
    </>
  );
}
