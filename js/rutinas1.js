// Contenedor para mostrar las interacciones
const app = document.getElementById("app");

// Variable para guardar las respuestas del usuario
let respuestas = {};

// Función para mostrar preguntas
function addQuestion(question) {
    const p = document.createElement("p");
    p.className = "question";
    p.textContent = question;
    app.appendChild(p);
}

// Función para mostrar respuestas
function addResponse(response) {
    const p = document.createElement("p");
    p.className = "response";
    p.textContent = response;
    app.appendChild(p);
}

// Función para mostrar opciones como botones
function addOptions(options, callback) {
    const container = document.createElement("div");
    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.onclick = () => {
            callback(option.value);
            container.remove();
        };
        container.appendChild(button);
    });
    app.appendChild(container);
}

// Función para mostrar una tabla de horarios
function addScheduleTable(day, schedule) {
    const table = document.createElement("table");
    table.className = "schedule";
    const headerRow = document.createElement("tr");
    const headers = ["Hora", "Actividad"];
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    schedule.forEach(row => {
        const tr = document.createElement("tr");
        const tdHour = document.createElement("td");
        const tdActivity = document.createElement("td");
        tdHour.textContent = row.hora;
        tdActivity.textContent = row.actividad;
        tr.appendChild(tdHour);
        tr.appendChild(tdActivity);
        table.appendChild(tr);
    });

    const heading = document.createElement("h2");
    heading.textContent = `Horario para ${day.charAt(0).toUpperCase() + day.slice(1)}`;
    app.appendChild(heading);
    app.appendChild(table);
}

// Inicia el flujo de decisiones
function startRoutine() {
    addQuestion("¿Es día lectivo o fin de semana?");
    addOptions(
        [
            { text: "Día lectivo", value: "lectivo" },
            { text: "Fin de semana", value: "finDeSemana" }
        ],
        handleDayType
    );
}

// ¿Es día lectivo o fin de semana?
function handleDayType(dayType) {
    respuestas.diaTipo = dayType;
    if (dayType === "lectivo") {
        addResponse("Es un día lectivo.");
        selectDay(["lunes", "martes", "miércoles", "jueves", "viernes"]);
    } else {
        addResponse("Es fin de semana.");
        selectDay(["sábado", "domingo"]);
    }
}

// Selección del día
function selectDay(days) {
    addQuestion("¿Qué día es hoy?");
    const options = days.map(day => ({ text: day.charAt(0).toUpperCase() + day.slice(1), value: day }));
    addOptions(options, handleDaySelection);
}

// Manejo del día seleccionado
function handleDaySelection(day) {
    respuestas.diaSemana = day;
    const schedules = {
        lunes: [
            { hora: "8:00 - 9:00", actividad: "Matemáticas" },
            { hora: "9:00 - 10:00", actividad: "Música" },
            { hora: "10:00 - 11:00", actividad: "Historia" }
        ],
        martes: [
            { hora: "8:00 - 9:00", actividad: "Informática" },
            { hora: "9:00 - 10:00", actividad: "Dibujo" },
            { hora: "10:00 - 11:00", actividad: "Ciencias" }
        ],
        miércoles: [
            { hora: "8:00 - 9:00", actividad: "Matemáticas" },
            { hora: "9:00 - 10:00", actividad: "Educación Física" },
            { hora: "10:00 - 11:00", actividad: "Geografía" }
        ],
        jueves: [
            { hora: "8:00 - 9:00", actividad: "Ciencias" },
            { hora: "9:00 - 10:00", actividad: "Música" },
            { hora: "10:00 - 11:00", actividad: "Arte" }
        ],
        viernes: [
            { hora: "8:00 - 9:00", actividad: "Informática" },
            { hora: "9:00 - 10:00", actividad: "Matemáticas" },
            { hora: "10:00 - 11:00", actividad: "Ciencias Sociales" }
        ]
    };

    addScheduleTable(day, schedules[day] || []);
    askIfHasHomework();
}

// Preguntar si tiene deberes
function askIfHasHomework() {
    addQuestion("¿Tienes deberes?");
    addOptions(
        [
            { text: "Sí", value: "si" },
            { text: "No", value: "no" }
        ],
        response => {
            if (response === "si") {
                askIfHomeworkDone();
            } else {
                addResponse("No tienes deberes. ¡Qué suerte!");
                askIfHasExam();
            }
        }
    );
}

// Preguntar si los deberes están hechos
function askIfHomeworkDone() {
    addQuestion("¿Has hecho tus deberes?");
    addOptions(
        [
            { text: "Sí", value: "si" },
            { text: "No", value: "no" }
        ],
        response => {
            if (response === "si") {
                addResponse("¡Muy bien! Has hecho tus deberes.");
            } else {
                addResponse("¡Deberías haber hecho tus deberes! 😠");
            }
            askIfHasExam();
        }
    );
}

// Preguntar si tiene examen
function askIfHasExam() {
    addQuestion("¿Tienes examen?");
    addOptions(
        [
            { text: "Sí", value: "si" },
            { text: "No", value: "no" }
        ],
        response => {
            if (response === "si") {
                askIfExamStudied();
            } else {
                addResponse("No tienes examen. ¡Qué alivio!");
                handleFinalRoutine();
            }
        }
    );
}

// Preguntar si ha estudiado para el examen
function askIfExamStudied() {
    addQuestion("¿Has estudiado para tu examen?");
    addOptions(
        [
            { text: "Sí", value: "si" },
            { text: "No", value: "no" }
        ],
        response => {
            if (response === "si") {
                addResponse("¡Muy bien! Estás listo para el examen.");
            } else {
                addResponse("¡Deberías haber estudiado! 😠");
            }
            handleFinalRoutine();
        }
    );
}

// Rutina final del día
function handleFinalRoutine() {
    addQuestion("¿Qué actividades realizarás para cerrar el día?");
    addOptions(
        [
            { text: "Hacer deberes", value: "deberes" },
            { text: "Leer", value: "leer" },
            { text: "Estudiar", value: "estudiar" },
            { text: "Descansar", value: "descansar" }
        ],
        activity => {
            addResponse(`Has seleccionado: ${activity}. ¡Día completado!`);
        }
    );
}

// Inicia el programa
startRoutine();

