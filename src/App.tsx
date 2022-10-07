import { useGyroscope } from "./useGyroscope";

function App() {
  const values = useGyroscope();

  return (
    <div className="text-lg">
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
}

export default App;
