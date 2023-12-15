
interface Props {
    typing: boolean;
}
const Typing = ({typing}: Props) => {
  return (
    <div>
      {!typing ? <p>Done</p> : <p>Typing...</p>}
    </div>
  )
}

export default Typing
