
export const filtraPorArea = (areas, historial) => {
    
    let arr = [];
    areas.map((area) => {

      let fila = {
        id_area: area.id_area,
        nombre_area: area.nombre_area,
        historial: historial.filter((h) => h.id_area === area.id_area),
        progreso: 0, // Inicializa el contador de errores en false
      };

      fila.historial = fila.historial.map((f) => {
        let nuevoObjeto = Object.assign({}, f); // Crea una copia del objeto existente
        if (nuevoObjeto.estado_final === "true") {
          fila.progreso++;
        } else {
          fila.progreso--;
        }
        nuevoObjeto.valor_acumulado = fila.progreso; // Agrega el valor acumulado al nuevo objeto
        return nuevoObjeto;
      });
      arr.push(fila);
    });
    return arr;
  };