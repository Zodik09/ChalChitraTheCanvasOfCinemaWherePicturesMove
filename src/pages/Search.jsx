import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";

const Search = () => {
  const { register, handleSubmit } = useForm();
  // const { reset } = useForm(); Paste reset() after the form data submition successfully;
  // console.log(register);
  

  const submitHandler = (data) => {
console.log(data);

  }
  return (
    <>
      <Navbar />
      <form
      onSubmit={handleSubmit(submitHandler)}>
        <input type="text" {...register("searchedData")} placeholder="Search..." />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
