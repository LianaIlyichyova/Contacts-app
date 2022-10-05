import SearchIcon from "@material-ui/icons/Search";
import { contactsPageVariables } from "../../../assets/variables/variables";
import "./search-contact.scss";

const SearchContact = ({
  setText,
  text,
}: {
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
}) => {
  return (
    <div className="search-container">
      <SearchIcon className="search-item" />
      <input
        type="text"
        placeholder={contactsPageVariables.search}
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="search-item"
      />
    </div>
  );
};

export default SearchContact;
