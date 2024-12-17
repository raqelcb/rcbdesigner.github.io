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

// Función para mostrar una lista de opciones con selección múltiple
function addMultiSelect(question, options, callback) {
    addQuestion(question);
    const container = document.createElement("div");
    const selected = new Set();

    options.forEach(option => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = option.value;
        checkbox.id = option.value;

        const label = document.createElement("label");
        label.textContent = option.text;
        label.htmlFor = option.value;

        container.appendChild(checkbox);
        container.appendChild(label);
        container.appendChild(document.createElement("br"));
    });

    const submitButton = document.createElement("button");
    submitButton.textContent = "Confirmar";
    submitButton.onclick = () => {
        const selectedValues = Array.from(container.querySelectorAll("input:checked"))
            .map(input => input.value);
        callback(selectedValues);
        container.remove();
    };

    container.appendChild(submitButton);
    app.appendChild(container);
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
        ],
        sábado: [
            { hora: "10:00 - 11:00", actividad: "Partido de fútbol" },
            { hora: "11:00 - 12:00", actividad: "Tiempo libre con amigos" }
        ],
        domingo: [
            { hora: "10:00 - 11:00", actividad: "Visita a los abuelos" },
            { hora: "11:00 - 12:00", actividad: "Museo" }
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
                askHomeworkSubjects();
            } else {
                askIfHasExam();
            }
        }
    );
}

// Preguntar asignaturas de los deberes
function askHomeworkSubjects() {
    const subjects = [
        { text: "Matemáticas", value: "matematicas" },
        { text: "Ciencias", value: "ciencias" },
        { text: "Música", value: "musica" },
        { text: "Historia", value: "historia" },
        { text: "Arte", value: "arte" }
    ];
    addMultiSelect("¿En qué asignaturas tienes deberes?", subjects, selectedSubjects => {
        if (selectedSubjects.length > 0) {
            addResponse(`Tienes deberes en: ${selectedSubjects.join(", ")}.`);
            askIfHomeworkDone();
        } else {
            askIfHasExam();
        }
    });
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
                askExamSubjects();
            } else {
                manageTime();
            }
        }
    );
}

// Preguntar asignaturas del examen
function askExamSubjects() {
    const subjects = [
        { text: "Matemáticas", value: "matematicas" },
        { text: "Ciencias", value: "ciencias" },
        { text: "Música", value: "musica" },
        { text: "Historia", value: "historia" },
        { text: "Arte", value: "arte" }
    ];
    addMultiSelect("¿En qué asignaturas tienes examen?", subjects, selectedSubjects => {
        if (selectedSubjects.length > 0) {
            addResponse(`Tienes examen en: ${selectedSubjects.join(", ")}.`);
            askIfExamStudied();
        } else {
            manageTime();
        }
    });
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
            manageTime();
        }
    );
}

// Gestión del tiempo según la hora
function manageTime() {
    addQuestion("¿Qué hora es ahora? (Formato 24h, ejemplo: 18)");
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Introduce la hora";
    app.appendChild(input);

    const button = document.createElement("button");
    button.textContent = "Confirmar";
    button.onclick = () => {
        const hora = parseInt(input.value);
        if (hora >= 16 && hora < 18) {
            addResponse("Es hora de actividades extraescolares.");
        } else if (hora >= 18 && hora < 20) {
            addResponse("Tiempo libre: Puedes descansar o jugar.");
        } else if (hora >= 20 && hora < 21) {
            addResponse("Es hora de cenar.");
        } else if (hora >= 21) {
            addResponse("Es hora de ducharse y prepararse para dormir.");
        } else {
            addResponse("Aprovecha para hacer tareas o estudiar.");
        }
    };
    app.appendChild(button);
}

// Inicia el programa
startRoutine();