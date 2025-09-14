import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../../styles/main.scss";

function ContactHookForm({ initialData = {}, onSubmitBook, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setValue("title", initialData.title || "");
      setValue("pageCount", String(initialData.pageCount || ""));
      setValue("publishedDate", initialData.publishedDate?.substring(0, 10) || "");
      setValue("isbn", initialData.isbn || "");
      setValue("authorId", String(initialData.authorId || ""));
      setValue("publisherId", String(initialData.publisherId || ""));
    }
  }, [initialData, setValue]);

  const onSubmit = (data) => {
    const book = {
      id: initialData?.id, // za PUT
      title: data.title,
      pageCount: Number(data.pageCount),
      publishedDate: new Date(data.publishedDate).toISOString(),
      isbn: data.isbn,
      authorId: Number(data.authorId),
      publisherId: Number(data.publisherId),
    };
  
    onSubmitBook(book); // ← tvoja funkcija za POST/PUT
    reset();
  };

  return (
    <form className="formaDodaj" onSubmit={handleSubmit(onSubmit)}>
      <label>
        Naslov:
        <input
          type="text"
          {...register("title", {
            required: "Obavezno je uneti naslov knjige!",
          })}
        />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </label>
      <br />

      <label>
        Broj strana:
        <input
          type="number"
          {...register("pageCount", {
            required: "Obavezno je uneti broj strana!",
            min: {
              value: 1,
              message: "Knjiga mora imati bar jednu stranu.",
            },
          })}
        />
        {errors.pageCount && <p className="error">{errors.pageCount.message}</p>}
      </label>
      <br />

      <label>
        Datum objavljivanja:
        <input
          type="date"
          {...register("publishedDate", {
            required: "Obavezno je uneti datum objavljivanja!",
          })}
        />
        {errors.publishedDate && <p className="error">{errors.publishedDate.message}</p>}
      </label>
      <br />

      <label>
        ISBN:
        <input
          type="text"
          {...register("isbn", {
            required: "Obavezno je uneti ISBN!",
            pattern: {
              value: /^[0-9\-]+$/,
              message: "ISBN mora sadržavati samo brojeve i crtice.",
            },
          })}
        />
        {errors.isbn && <p className="error">{errors.isbn.message}</p>}
      </label>
      <br />

      <label>
        Autor ID:
        <input
          type="number"
          {...register("authorId", {
            required: "Obavezno je uneti ID autora!",
            min: {
              value: 1,
              message: "ID autora mora biti pozitivan broj.",
            },
          })}
        />
        {errors.authorId && <p className="error">{errors.authorId.message}</p>}
      </label>
      <br />

      <label>
        Izdavač ID:
        <input
          type="number"
          {...register("publisherId", {
            required: "Obavezno je uneti ID izdavača!",
            min: {
              value: 1,
              message: "ID izdavača mora biti pozitivan broj.",
            },
          })}
        />
        {errors.publisherId && <p className="error">{errors.publisherId.message}</p>}
      </label>
      <br />

      <button type="submit">
        {initialData && initialData.id ? "Sačuvaj izmene" : "Dodaj knjigu"}
      </button>

      {initialData && initialData.id && (
        <button type="button" onClick={onCancel}>
          Otkaži
        </button>
      )}
    </form>

  );
}

export default ContactHookForm;
