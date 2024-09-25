import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../src/App.css";

import { getUsers, getSells } from "../src/Controllers/Methods";

function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [users, setUsers] = useState([]);
  const [sells, setSells] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await getUsers();
      const fetchedSells = await getSells();
      setUsers(fetchedUsers);
      setSells(fetchedSells);
    };
    fetchData();
  }, []);

  const handleClick = () => {

    const ventasEnRango = sells.filter((sell) =>
      isInTheDateRange(formatDate(startDate), formatDate(endDate), sell.FechaVenta)
    );

    const resultAux = sumarCuotasMonto(ventasEnRango);

    if(resultAux.length < 1){
      window.alert("No se encontraron registros");
    }

    setResult(reemplazarVendedorPorNombre(resultAux, users));
  };

  const reemplazarVendedorPorNombre = (sells, users) => {
    sells.forEach((sell) => {
      const vendedorId = sell.Vendedor;
      const usuario = users.find((user) => user.id === vendedorId);

      if (usuario) {
        sell.Vendedor = usuario.Nombre;
      }
    });

    return sells;
  };

  const sumarCuotasMonto = (listaObjetos) => {
    const resultado = [];
    const vendedores = {};

    listaObjetos.forEach((objeto) => {
      const vendedor = objeto.Vendedor;
      const cuotaMonto = parseFloat(objeto.CuotaMonto);

      if (!isNaN(cuotaMonto)) {
        if (vendedor in vendedores) {
          vendedores[vendedor] += cuotaMonto;
        } else {
          vendedores[vendedor] = cuotaMonto;
        }
      }
    });

    for (const vendedor in vendedores) {
      resultado.push({ Vendedor: vendedor, CuotaMonto: vendedores[vendedor] });
    }

    return resultado;
  };

  const isInTheDateRange = (fechaInicial, fechaFinal, fecha) => {
      try {
        // Extraer día, mes y año de las fechas
        const [diaInicial, mesInicial, anioInicial] = fechaInicial.split("/");
        const [diaFinal, mesFinal, anioFinal] = fechaFinal.split("/");
        const [dia, mes, anio] = fecha.split("/");

        // Crear objetos de fecha en el formato correcto (mes - 1 porque los meses en JavaScript son base 0)
        const fechaInicialObj = new Date(anioInicial, mesInicial - 1, diaInicial);
        const fechaFinalObj = new Date(anioFinal, mesFinal - 1, diaFinal);
        const fechaObj = new Date(anio, mes - 1, dia);

        return fechaObj >= fechaInicialObj && fechaObj <= fechaFinalObj;
      } catch (error) {
        console.error("isInTheDateRange error: ", error);
        return false;

      }

    }

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  };


  return (
    <div className="hello">
      <div className="contenedor">
        <label>Fecha Inicio</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="datePicker"
          dateFormat="dd/MM/yyyy"
          placeholderText="Fecha Inicio"
        />

        <label>Fecha Final</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          className="datePicker"
          dateFormat="dd/MM/yyyy"
          placeholderText="Fecha Fin"
        />

        <button onClick={handleClick}>Filtrar</button>
      </div>

    <h2>Ventas Realizadas</h2>
      {result.map((res, index) => (
        <div key={index} className="row">
          <label> Vendedor: {res.Vendedor}</label>
          <label> Monto vendido: {res.CuotaMonto}</label>
        </div>
      ))}
    </div>
  );
}

export default App;