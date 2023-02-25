import { Formik, Form } from "formik";
import { UseTodos } from "./context/TodosContextProvider";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import emojiRegex from "emoji-regex";
const regex = emojiRegex();

interface MyFormValues {
  title: string;
  description: string;
  emoji: string;
}

const TodoForm: React.FC<{}> = () => {
  const ref = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const emojisMamalones = [
    "😝",
    "😘",
    "❤️",
    "😍",
    "🥞",
    "🥵",
    "🔥",
    "🍆",
    "🍑",
    "✨",
    "🎃",
    "😡",
    "😈",
  ];
  const [initialTodo, setInitialTodo] = useState({
    title: "",
    description: "",
    emoji: emojisMamalones[Math.floor(Math.random() * 13)],
  });
  const params = useParams();
  const { createTodo, getTodo, updateTodo } = UseTodos();

  useEffect(() => {
    console.log(ref);
    if (!params.id) return console.log("Pagina de crear");
    const getEditData = async () => {
      const data = await getTodo(parseInt(params.id as string));
      setInitialTodo({
        title: data[0].title,
        description: data[0].description,
        emoji: data[0].emoji,
      });
    };
    getEditData();
  }, []);

  return (
    <div className="w-10/12 mx-auto  lg:p-4 lg:pl-20 pt-10">
      <h1 className="font-poppins font-semibold text-2xl pb-4">
        {params.id ? "Editar Tarea" : "Crea una nueva tarea"}
      </h1>
      <Formik
        initialValues={initialTodo}
        enableReinitialize={true}
        onSubmit={async (values) => {
          const matches = values.emoji?.match(regex)
          console.log(matches, values.emoji)
          if (matches?.length != 1) {
            ref.current?.lastElementChild?.classList.remove("opacity-0");
            ref.current?.lastElementChild?.classList.add("focus:border-red-500");
            (ref.current?.children[1] as HTMLInputElement).focus()
            return console.log("Este imbecil intenta pasarse de listo");
          }
          if (!params.id) {
            await createTodo({...values, emoji: matches[0]});
          } else {
            await updateTodo(parseInt(params.id as string), values);
          }
          setInitialTodo({ title: "", description: "", emoji: "⭕" });
          navigate("/");
        }}
      >
        {({ values, isSubmitting, handleSubmit, handleChange }) => (
          <Form
          autoComplete="off"
            className="font-source flex flex-col w-full lg:w-min "
            onSubmit={handleSubmit}
          >
            <label htmlFor="title" className="font-semibold text-xl">
              Titulo
            </label>
            <input
            autoComplete="off"
              type="text"
              value={values.title}
              name="title"
              placeholder="Write a title"
              onChange={handleChange}
              maxLength={200}
              className="focus:outline-none overflow-hidden w-full lg:w-96 placeholder:text-white placeholder:text-opacity-80 rounded-md py-3 px-2 my-3 bg-gray-50 bg-opacity-50 text-white text-lg"
            />
            <div ref={ref} className="flex flex-col items-left">
              <label htmlFor="emoji" className=" font-semibold text-xl">
                Emoji
              </label>
              <input
              autoComplete="off"
                type="text"
                value={values.emoji}
                name="emoji"
                placeholder="😈"
                onChange={handleChange}
                maxLength={4}
                className="border-2 border-transparent focus:outline-none overflow-hidden w-[120px] lg:w-96  placeholder:text-white placeholder:text-opacity-50 rounded-md py-3 px-2 my-3 bg-gray-50 bg-opacity-50 text-white text-4xl"
              />
              <span
              
              className="font-source font-semibold text-red-500 opacity-0"
            >
              Solo un emoji, bastard@
            </span>
            </div>
            
            <label className="font-semibold text-xl mt-2" htmlFor="description">
              Descripcion
            </label>
            <textarea
            autoComplete="off"
              maxLength={300}
              className="focus:outline-none overflow-hidden block w-full lg:w-96  placeholder:text-white placeholder:text-opacity-80 rounded-md py-1 px-2 my-3 bg-gray-50 bg-opacity-50 text-white text-opacity-80 text-lg"
              name="description"
              rows={8}
              placeholder="Write the description"
              onChange={handleChange}
              value={values.description}
            ></textarea>
            <button
              className="w-full bg-blue-600 text-lg text-white font-semibold font-source lg:w-min px-6 py-4 my-3 rounded-md "
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TodoForm;
