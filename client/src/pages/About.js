import React from "react";
import Layout from "../components/Layout/Layout";
import aboutImg from "../images/about.png";

const About = () => {
    return (<
        Layout title={"About - ShopUp app"} >
        <
        div className=" contact" >
            <
        div className="contact_img" >
                <
                    img src={aboutImg}
                    alt="aboutImg" /
                >
                <
        /div>{" "} <
        div className="contact_info" >
                    <
        div className="contact_name" > About Us < /div>{" "} <
        p className="about_para" >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.Voluptas,
                            culpa quam.Debitis veniam voluptas dolore fugit vero molestiae, aut asperiores esse!Eveniet excepturi consectetur animi eaque perspiciatis error, alias magni neque quae, deserunt aliquam at,
                            quibusdam quidem aliquid quis iusto repellat qui ? Iusto,
                            dolor.Maiores dignissimos molestias quas iste, soluta, enim veritatis accusantium iusto, natus deserunt quibusdam voluptatem sapiente esse. {" "} <
        /p>{" "} < /
        div > {" "} <
        /div>{" "} < /
        Layout >
                            );
};

                            Layout.defaultProps = {
                                title: "ShopUp app ",
                            description: "MERN stack project",
                            keywords: "mern, mongodb,nodejs,react",
                            author: "Wajahat Hussain",
};

                            export default About;