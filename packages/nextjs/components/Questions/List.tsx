import { Question } from "~~/types/question";

export const List = ({
  questions,
  isLoading,
  questionsOpened,
}: {
  questions: Question[];
  isLoading: boolean;
  questionsOpened: number[];
}) => {
  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div>
        <p>No questions yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-x-20 justify-center">
        <table className="table table-zebra self-start">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Question</th>
              <th>Open</th>
            </tr>
          </thead>
          <tbody>
            {questions.map(question => (
              <tr className="text-center" key={question.id}>
                <td>
                  <a href={`/admin/questions/${question.id}`}>{question.id}</a>
                </td>
                <td>
                  <a href={`/admin/questions/${question.id}`}>{question.question}</a>
                </td>
                <td>{questionsOpened.includes(question.id) ? "✓" : "×"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
