import { useState } from "react";
import styles from "./AddCountryForm.module.scss";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ADD_COUNTRY } from "../../api/countries";
import { GET_CONTINENTS } from "../../api/continents";
import { z } from "zod";

const countrySchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
      "Le nom ne doit contenir que des lettres"
    ),
  code: z
    .string()
    .regex(/^[A-Z]{2}$/, "Le code doit être 2 lettres majuscules"),
  emoji: z.string().max(4, "L'emoji semble invalide"),
  continentId: z.string().min(1, "Le continent est obligatoire"),
});

type FormData = z.infer<typeof countrySchema>;

const AddCountryForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    code: "",
    emoji: "",
    continentId: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const { data: continentsData, loading: continentsLoading } = useQuery(
    gql(GET_CONTINENTS)
  );

  const [addCountry, { loading: adding }] = useMutation(gql(ADD_COUNTRY), {
    update(cache, { data: { addCountry } }) {
      cache.modify({
        fields: {
          countries(existingCountries = []) {
            return [...existingCountries, addCountry];
          },
        },
      });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = countrySchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      validation.error.errors.forEach((err) => {
        const fieldName = err.path[0] as keyof FormData;
        fieldErrors[fieldName] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await addCountry({
        variables: {
          data: {
            name: formData.name,
            code: formData.code,
            emoji: formData.emoji,
            continent: {
              id: Number(formData.continentId),
            },
          },
        },
      });
      setFormData({ name: "", code: "", emoji: "", continentId: "" });
      setErrors({});
    } catch (error) {
      console.error("Erreur lors de l'ajout du pays :", error);
    }
  };

  if (continentsLoading) return <p>Chargement des continents...</p>;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <input
          type="text"
          name="name"
          placeholder="Nom du pays"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.field}>
        <input
          type="text"
          name="code"
          placeholder="Code (ex: FR)"
          value={formData.code}
          onChange={handleChange}
        />
        {errors.code && <p className={styles.error}>{errors.code}</p>}
      </div>

      <div className={styles.field}>
        <input
          type="text"
          name="emoji"
          placeholder="Emoji (ex: 🇫🇷)"
          value={formData.emoji}
          onChange={handleChange}
        />
        {errors.emoji && <p className={styles.error}>{errors.emoji}</p>}
      </div>

      <div className={styles.field}>
        <select
          name="continentId"
          value={formData.continentId}
          onChange={handleChange}
        >
          <option value="">-- Choisir un continent --</option>
          {continentsData.continents.map(
            (continent: { id: string; name: string }) => (
              <option key={continent.id} value={continent.id}>
                {continent.name}
              </option>
            )
          )}
        </select>
        {errors.continentId && (
          <p className={styles.error}>{errors.continentId}</p>
        )}
      </div>

      <button type="submit" disabled={adding}>
        {adding ? "Ajout..." : "Ajouter"}
      </button>
    </form>
  );
};

export default AddCountryForm;
