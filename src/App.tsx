import { useGyroscope } from "./useGyroscope";

function App() {
  const { deviceOrientation, requestPermission } = useGyroscope();

  return (
    <div className="text-lg">
      <h1>
        <button onClick={() => requestPermission()}>request permissions</button>
      </h1>
      <pre>{JSON.stringify(deviceOrientation, null, 2)}</pre>
    </div>
  );
}

export default App;
