export function Lib3(props: { showSecret?: boolean }) {
  if (props.showSecret) {
    return <h1>This is the secret. Ssshhhh...</h1>;
  } else {
    return <h1>Welcome to Lib3!</h1>;
  }
}

export default Lib3;
