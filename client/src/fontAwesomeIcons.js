import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowRightFromBracket,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export const add = <FontAwesomeIcon icon={faPlus} />;
export const logout = <FontAwesomeIcon icon={faArrowRightFromBracket} />;
export const edit = <FontAwesomeIcon icon={faPen} style={{ height: "1rem" }} />;
export const remove = (
  <FontAwesomeIcon
    icon={faXmark}
    style={{ width: "1.2rem", height: "1.2rem" }}
  />
);
