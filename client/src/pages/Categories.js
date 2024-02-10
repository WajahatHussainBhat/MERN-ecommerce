import Layout from "../components/Layout/Layout";
import React from "react";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";


const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All categories"}>
      <div className="all-categories">
        <h1 className="all-categories-title"> All categories </h1>{" "}
        {categories.map((c) => (
          <div className="all-categories-buttons" key={c._id}>
            <Link to={`/category/${c.slug}`} className="all-categories-btn">
              {c.name}
            </Link>
          </div>
        ))}{" "}
      </div>{" "}
    </Layout>
  );
};

export default Categories;
