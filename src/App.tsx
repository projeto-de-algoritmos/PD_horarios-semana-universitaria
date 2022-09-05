import { useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { RangeButton } from "./components/RangeButton";
import { timeWillSpend, pointStop } from "./utils/data";
import gateway from "./utils/planejador";

function App() {
  const [selectedTime, setSelectedTime] = useState(timeWillSpend[0].value);
  const [selectedPoint, setSelectedPoint] = useState(pointStop[0].value);
  const [SpotName, setSpotName] = useState("");
  const [timeInHours, settimeInHours] = useState("5");
  const [Spots, setSpots] = useState<any>([]);
  const [result, setResult] = useState([]);
  const [isCalcOption, setIsCalcOption] = useState(false);

  const handleAddNewTouristSpot = () => {
    if (!SpotName) {
      alert('O nome do local é obrigatório!');
      return;
    }
    setSpots([
      ...Spots,
      [SpotName, selectedTime, selectedPoint],
    ]);
  };

  const handleRemoveSpot = (name: string) => {
    const filter = Spots.filter((spots: any) => spots[0] !== name);
    setSpots(filter);
  };

  const handleResult = () => {
    if (Spots.length === 0) {
      alert('O evento/curso é obrigatório!');
      return;
    }
    setResult(gateway(Spots));
  };

  return (
    <>
      <h1 className="text-center font-bold mt-4 text-3xl">
        Planejador de horas para a semana universitária
      </h1>
      {(!isCalcOption) ? (
        <div className="flex items-center justify-center gap-4 h-screen w-full">
          <div className="flex flex-row mx-16 p-4 border-2">
            <div className="w-full flex flex-col gap-4 pr-4 border-r-2">
              <Input
                label="Nome do curso/evento da semana universitária:"
                type="text"
                setValue={setSpotName}
              />

              <RangeButton
                title="De 0 (pouco) a 10 (muito), o quanto você quer participar deste curso/evento?"
                range={pointStop}
                setValue={setSelectedPoint}
                selectedValue={selectedPoint}
              />

              <RangeButton
                title="Quantas horas você gastará com este curso/evento?"
                range={timeWillSpend}
                setValue={setSelectedTime}
                selectedValue={selectedTime}
              />

              <div className="text-center">
                <Button
                  text="Adicionar Curso/Evento"
                  onClick={handleAddNewTouristSpot}
                />
              </div>
            </div>

            <div className="flex w-full">
              {Spots.length === 0 ? (
                <div className="w-full">
                  <p className="text-center">Eventos/Cursos adicionados serão exibidos aqui</p>
                </div>
              ) : (
                <div className="w-full ml-4">
                  <div className="w-full">
                    {Spots.map((spots: any, index: number) => (
                      <div 
                        key={index}
                        className="w-full flex items-center gap-4 px-4 py-2 
                          justify-between bg-blue-300 rounded-lg mb-2"
                      >
                        <div className="w-full flex justify-between">
                          <p>Local: {spots[0]}</p>
                          <p>Horas: {spots[1]}h</p>
                          <p>Nota: {spots[2]}</p>
                        </div>
                        
                        <Button 
                          text="X"
                          onClick={() => handleRemoveSpot(spots[0])}
                        />
                      </div>
                    ))}

                    <div className="text-center mt-8">
                      <Button 
                        text="Calcular sua melhor opção"
                        onClick={() => setIsCalcOption(true)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mx-16 h-screen gap-4">
          <Input
            label="Quanto tempo você dispõe para participar dos Eventos/Cursos? (Em Horas)"
            type="number"
            value={timeInHours}
            setValue={settimeInHours}
          />

          <div className="">
            <Button
              text="Calcular"
              onClick={handleResult}
            />
          </div>

          {(result.length !== 0) && (
            <>
              <div className="flex flex-col items-center text-center border-2 bg-green-600 
                text-white shadow-lg rounded-lg px-4 py-2">
                <h4 style={{ margin: 0, marginTop: 10 }}>
                  Resultado da melhor sugestão possível de Eventos/Cursos <br/>para a semana universitária
                </h4>
                <br/>
                <div className="">
                  {result.map((value, id) => (
                    <p key={id}>
                      <strong>{value}</strong>
                    </p>
                  ))}
                </div>

              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default App;