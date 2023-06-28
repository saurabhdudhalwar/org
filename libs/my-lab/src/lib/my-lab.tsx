/* eslint-disable-next-line */
export interface MyLabProps {}

export function MyLab(props: MyLabProps) {
  return (
    <div>
      <style jsx>{`
        div {
          color: pink;
        }
      `}</style>
      <h1>Welcome to MyLab!</h1>
    </div>
  );
}

export default MyLab;
