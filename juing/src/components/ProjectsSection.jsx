import React, { useState } from "react";
import ScrollMorphHero from "./ui/scroll-morph-hero";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { projects } from "../data/Projects";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (index, project) => {
    setSelectedProject(projects[index]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Small delay to let animation complete before clearing state
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full">
        {/* Hero Section with Scroll Animation */}
        <div className="w-full h-[800px]">
          <ScrollMorphHero projects={projects} onCardClick={handleCardClick} />
        </div>

        {/* Project Details Modal */}
        <ProjectDetailsModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
}
