import { Link } from "react-router-dom";
import imagen from "/icon-just-books.png"
type Props = {};

function Footer({}: Props) {
  return (
    <div className="flex justify-between items-center px-4 h-40 md:h-20 absolute bottom-0 w-full  bg-purple-800 text-gray-100">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="min-w-fit ">
          <img className="w-10" src={imagen} alt="" />
          <span className="text-purple-200  text-xs font-poppins ">
            By John
          </span>
        </div>
        <a
          className="hover:underline"
          rel="noopener noreferrer"
          href="https://github.com/Aimajoke/TODO-MERN-STACK"
          target="_blank"
        >
          Github
        </a>
      </div>
      <div className="text-right text-gray-200">
        <Link
          className="text-sm text-center my-3 hover:underline"
          to={"/cementery"}
        >
          Sabias que nada en internet se elimina
          <br />
          Quieres ver el cementerio?
        </Link>
      </div>
    </div>
  );
}

export default Footer;
