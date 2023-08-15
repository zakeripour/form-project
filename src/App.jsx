import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState } from "react";

export default function App() {
  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: {
      records: [{}],
    },
  });

  const { fields, append, update } = useFieldArray({
    control,
    name: "records",
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(
          (data) => console.log(data),
          (error) => console.error(error)
        )}
      >
        {fields.map((field, index) => (
          <Edit
            key={field.id}
            control={control}
            update={update}
            index={index}
            setValue={setValue}
            value={field.id}
            register={register}
          />
        ))}

        <button
          className="add"
          type="button"
          onClick={() => {
            append({});
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          افزودن به سابقه
        </button>

        <div>
          <button type="submit" className="btn">
            ذخیره اطلاعات
          </button>
        </div>
      </form>
    </>
  );
}

const Edit = ({ register, control, setValue, index, value }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleClick = () => {
    setValue(`records[${index}].doreh_entekhabat`, null);
    setValue(`records[${index}].hozeh_entekhabat`, null);
    setValue(`records[${index}].nobate_entekhabat`, null);
    setValue(`records[${index}].ostan`, null);
  };

  return (
    <>
      <div className="content">
        <div className="first-form">
          <div className="intro">
            <p>
              <span className="addNumber">
                {" "}
                {(index + 1 + "").toPersianDigits()}
              </span>{" "}
              نماینده مجلس شورای اسلامی در ادوار گذشته بوده اید؟
              <span>*</span>
            </p>
          </div>
          <Controller
            name={`records[${index}].selectForm`}
            control={control}
            render={({ field: { onChange, ...slug } }) => (
              <select
                className="select-form"
                value={selectedOption}
                onChange={(e, a) => {
                  setSelectedOption(e.target.value);
                  if (e.target.value === "no") handleClick();
                  onChange(e, a);
                }}
              >
                <option value={""}>انتخاب کنید</option>
                <option value={"yes"}>بله</option>
                <option value={"no"}>خیر</option>
              </select>
            )}
          />
          <hr />

          <div className="main">
            <ul>
              <li>
                دوره انتخابات *
                <select
                  {...register(`records[${index}].doreh_entekhabat`)}
                  disabled={selectedOption !== "yes"}
                >
                  <option value={""}></option>
                  <option value={"first"}>1</option>
                  <option value={"second"}>2</option>
                  <option value={"third"}>3</option>
                </select>
              </li>

              <li>
                حوزه انتخابی*
                <select
                  {...register(`records[${index}].hozeh_entekhabat`)}
                  disabled={selectedOption !== "yes"}
                >
                  <option value={""}></option>
                  <option value={"1"}>منطقه 1</option>
                  <option value={"2"}>منطقه 2</option>
                  <option value={"3"}>منطقه 3</option>
                </select>
              </li>

              <li>
                نوبت انتخابات*
                <select
                  {...register(`records[${index}].nobate_entekhabat`)}
                  disabled={selectedOption !== "yes"}
                >
                  <option value={""}></option>
                  <option value={"aval"}>اول</option>
                  <option value={"dovom"}>دوم</option>
                </select>
              </li>

              <li>
                استان*
                <select
                  {...register(`records[${index}].ostan`)}
                  disabled={selectedOption !== "yes"}
                >
                  <option value={""}></option>
                  <option value={"Tehran"}>تهران</option>
                  <option value={"alborz"}> البرز</option>
                  <option value={" fars"}>فارس</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
