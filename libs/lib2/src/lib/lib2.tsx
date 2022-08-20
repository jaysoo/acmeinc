export function Lib2(props: { showSecret?: boolean }) {
  if (props.showSecret) {
    return <h1>This is a secret. Ssshhhh....</h1>;
  } else {
    return <h1>Welcome to Lib2!</h1>;
  }
}

export default Lib2;
