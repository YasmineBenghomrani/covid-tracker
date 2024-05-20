import logo from "./logo.svg";
import "./App.css";
import { MyLineChart } from "./components/lineChart";
import { MyPieChart } from "./components/pieChart";
import { useEffect, useState } from "react";
import axios from "axios";
import MultipleSelect from "./components/select";
import SelectAutoWidth from "./components/select";

function App() {
  const [Loading, setLoading] = useState(true);
  // const linedata = {
  //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       data: [20, 30, 40, 50, 303, 500],
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //   ],
  // };
  const pieData = {
    labels: ["Cases", "Recovered", "Deaths"],
    datasets: [
      {
        label: "Covid Stats",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const [pieChartData, setPieChart] = useState({
    labels: "Covid Stats",
    datasets: [
      {
        label: "Covid Stats",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  const [lineChartData, setlineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Dataset 1",
        data: [20, 30, 40, 50, 303, 500],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  const [selectCountry, setSelectCountry] = useState("");
  useEffect(
    () => {
      //la fonction va etre executer au moment du chargement de la page et dés qu'une variable change
      axios
        //execute la requette pour recuperer les donnes
        .get("https://disease.sh/v3/covid-19/historical/all")
        .then((res) => {
          console.log(res.data);
          setlineChartData({
            //on modifie l'etat du 1er graphe
            labels: Object.keys(res.data.cases),
            //recupere des données et les injecte dans un nouveau tableau
            datasets: [
              //Pour une deuxieme ligne on dupliQUEr a linterieur des crochets de datasets
              {
                label: "Dataset 1",
                data: Object.values(res.data.cases),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
              {
                label: "Dataset 1",
                data: Object.values(res.data.recovered),
                borderColor: "blue",
                backgroundColor: "blue",
              },
              {
                label: "Dataset 1",
                data: Object.values(res.data.deaths),
                borderColor: "yellow",
                backgroundColor: "yellow",
              },
            ],
          });
          let casesNumber = Object.values(res.data.cases);
          let casesCumule = casesNumber.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
          let RecoveredNumber = Object.values(res.data.recovered);
          let RecoveredCumule = RecoveredNumber.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
          let deathsNumber = Object.values(res.data.deaths);
          let deathsCumule = deathsNumber.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
          console.log(casesCumule, RecoveredCumule, deathsCumule);
          //accumulator : le total, currentValue prends la valeur de e donc chaque valeur du tableau
          //reduce fait la somme d'un tableau
          //0 valeur initial d'ou la fonction commence a sommer
          setPieChart({
            labels: ["Cases", "Recovered", "Deaths"],
            datasets: [
              {
                label: "Covid Stats",
                data: [casesCumule, RecoveredCumule, deathsCumule],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
              },
            ],
          });
          //console.log(res.data);
          //const dates = Object.keys(res.data.Cases);
          //la fonction object.keys rapport les donner de res.data.cases et les injectes dans un nouveau tableau pour dates
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    },
    [
      //tableau de depence
    ]
  );
  useEffect(() => {
    console.log(selectCountry);
    if (selectCountry !== "") {
      axios
        //execute la requette pour recuperer les donnes
        .get("https://disease.sh/v3/covid-19/historical/" + selectCountry)
        .then((res) => {
          console.log(res.data);
          setlineChartData({
            //on modifie l'etat du 1er graphe
            labels: Object.keys(res.data.timeline.cases),
            //recupere des données et les injecte dans un nouveau tableau
            datasets: [
              //Pour une deuxieme ligne on dupliQUEr a linterieur des crochets de datasets
              {
                label: "Dataset 1",
                data: Object.values(res.data.timeline.recovered),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
              {
                label: "Dataset 1",
                data: Object.values(res.data.timeline.deaths),
                borderColor: "blue",
                backgroundColor: "blue",
              },
              {
                label: "Dataset 1",
                data: Object.values(res.data.timeline.deaths),
                borderColor: "yellow",
                backgroundColor: "yellow",
              },
            ],
          });
          let casesNumber = Object.values(res.data.timeline.cases);
          let casesCumule = casesNumber.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
          let RecoveredNumber = Object.values(res.data.timeline.recovered);
          let RecoveredCumule = RecoveredNumber.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
          let deathsNumber = Object.values(res.data.timeline.deaths);
          let deathsCumule = deathsNumber.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
          console.log(casesCumule, RecoveredCumule, deathsCumule);
          //accumulator : le total, currentValue prends la valeur de e donc chaque valeur du tableau
          //reduce fait la somme d'un tableau
          //0 valeur initial d'ou la fonction commence a sommer
          setPieChart({
            labels: ["Cases", "Recovered", "Deaths"],
            datasets: [
              {
                label: "Covid Stats",
                data: [casesCumule, RecoveredCumule, deathsCumule],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
              },
            ],
          });
          //console.log(res.data);
          //const dates = Object.keys(res.data.Cases);
          //la fonction object.keys rapport les donner de res.data.cases et les injectes dans un nouveau tableau pour dates
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectCountry]);

  return (
    <main>
      <div className="selector">
        <SelectAutoWidth
          selectCountry={selectCountry}
          setSelectCountry={setSelectCountry}
        />
      </div>
      {Loading ? (
        <p>Loading...</p>
      ) : (
        //plus d'une div mettre entre un tag vide <></>
        <div className="Chart">
          <MyLineChart data={lineChartData} />
          <MyPieChart data={pieChartData} />
        </div>
      )}
    </main>
  );
}

export default App;
