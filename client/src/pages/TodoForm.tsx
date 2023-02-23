import { Formik, Form } from "formik";
import { UseTodos } from "./context/TodosContextProvider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface MyFormValues {
  title: string;
  description: string;
}

const TodoForm: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [initialTodo, setInitialTodo] = useState({
    title: "",
    description: "",
  });
  const params = useParams();
  const { createTodo, getTodo, updateTodo } = UseTodos();

  useEffect(() => {
    if (!params.id) return console.log("Pagina de crear");
    const getEditData = async () => {
      const data = await getTodo(parseInt(params.id as string));
      setInitialTodo({
        title: data[0].title,
        description: data[0].description,
      });
    };
    getEditData();
  }, []);

  return (
    <div className="p-4 pl-20 pt-10">
      <h1 className="font-poppins font-semibold text-2xl pb-4">
        {params.id ? "Editar Tarea" : "Crea una nueva tarea"}
      </h1>
      <Formik
        initialValues={initialTodo}
        enableReinitialize={true}
        onSubmit={async (values) => {
          if (!params.id) {
            await createTodo(values);
          } else {
            await updateTodo(parseInt(params.id as string), values);
          }
          setInitialTodo({ title: "", description: "" });
          navigate("/");
        }}
      >
        {({ values, isSubmitting, handleSubmit, handleChange }) => (
          <Form className="font-source flex flex-col w-min " onSubmit={handleSubmit}>
            <label htmlFor="title" className="font-semibold text-xl">
              Titulo
            </label>
            <input
              type="text"
              value={values.title}
              name="title"
              placeholder="Write a title"
              onChange={handleChange}
              maxLength={200}
              className="overflow-hidden w-96 placeholder:text-white placeholder:text-opacity-80 rounded-md py-1 px-2 my-3 bg-gray-50 bg-opacity-50 text-white text-lg"
            />
            <label className="font-semibold text-xl" htmlFor="description">Descripcion</label>
            <textarea
              maxLength={300}
              className="overflow-hidden block w-96  placeholder:text-white placeholder:text-opacity-80 rounded-md py-1 px-2 my-3 bg-gray-50 bg-opacity-50 text-white text-opacity-80 text-lg"
              name="description"
              rows={8}
              placeholder="Write the description"
              onChange={handleChange}
              value={values.description}
            ></textarea>
            <button className="bg-blue-600 text-white font-semibold font-source w-min px-6 py-2 rounded-md " type="submit" disabled={isSubmitting}>
              {isSubmitting?"Enviando...":"Enviar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TodoForm;
