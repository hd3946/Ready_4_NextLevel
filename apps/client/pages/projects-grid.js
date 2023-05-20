import Layout from "@components/layout";
import SEO from "@components/SEO";
import Footer from "@sections/Footer/v1";
import ProjectsGrid from "@sections/ProjectPages/ProjectsGrid";
import PageHeader from "@sections/ProjectPages/ProjectsList/PageHeader";
import { Fragment } from "react";


export default function ProjectGridPage() {  
  return (
    <Fragment>
      <SEO title="NextLevel" /> 
      <Layout>  
        <PageHeader currentPage="PROJECTS" pageTitle="Welcome Creators" />
        <ProjectsGrid />
        <Footer />
      </Layout>
    </Fragment>
  );
}
