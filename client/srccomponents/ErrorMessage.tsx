type Props = { message: string };

// Note to self: Centralized error UI.
export default function ErrorMessage({ message }: Props) {
  return <p style={{ color: "crimson" }}>{message}</p>;
}
