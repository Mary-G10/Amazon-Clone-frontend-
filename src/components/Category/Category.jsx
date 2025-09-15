import React from "react";
import { categoryImage } from "./CategoryFullInfos"; // Changed this line
import CategoryCard from "./CategoryCard";
import styles from "./Category.module.css";

export default function Category() {
  return (
    <section className="category-section">
      <section className={styles.categorySection}>
        {categoryImage.map((infos, index) => (
          <CategoryCard key={index} data={infos} />
        ))}
      </section>
    </section>
  );
}
