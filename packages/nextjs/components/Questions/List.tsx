import { Question } from "~~/types/question";

export const List = ({
  questions,
  isLoading,
  questionsOpened,
  questionsRevealed,
}: {
  questions: Question[];
  isLoading: boolean;
  questionsOpened: number[];
  questionsRevealed: number[];
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
              <th className="bg-primary text-white">ID</th>
              <th className="bg-primary text-white">Question</th>
              <th className="bg-primary text-white">Open</th>
              <th className="bg-primary text-white">Reveal</th>
            </tr>
          </thead>
          <tbody>
            {questions.map(question => (
              <tr className="text-center border-b border-primary last:border-0" key={question.id}>
                <td>
                  <a href={`/admin/questions/${question.id}`}>{question.id}</a>
                </td>
                <td>
                  <a href={`/admin/questions/${question.id}`} className="link link-hover">
                    {question.question}
                  </a>
                </td>
                <td>
                  {questionsOpened.includes(question.id) ? (
                    <span className="text-success">✓</span>
                  ) : (
                    <span className="text-error">×</span>
                  )}
                </td>
                <td>
                  {questionsRevealed.includes(question.id) ? (
                    <span className="text-success">✓</span>
                  ) : (
                    <span className="text-error">×</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
