import * as THREE from 'three';
import { gsap } from 'gsap';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
  alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Background Particles
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

// Projects Data
const projects = [
  {
    title: "E-Commerce Platform",
    description: "A AirBnb lookalike e-commerce solution built with HTML, CSS and JSB. Features include options for stays search options and price range.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    link: "#",
    technologies: ["HTML", "CSS", "JavaScript"]
  },
  {
    title: "Restraunt Menu Application",
    description: "A Restraunt Menu Application which gives variety of option to customers including offers and customers cann add items to cart.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    link: "#",
    technologies: ["HTML", "CSS", "JavaScript"]
  },
  {
    title: "PortFolio",
    description: "A PortFolio website that mentions about my career,education and certificates i earned over the years. ",
    image: "https://images.unsplash.com/photo-1558137623-ce933996c730?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    link: "#",
    technologies: ["HTML", "CSS", "JS"]
  }
];

// Initialize Projects
function initializeProjects() {
  const projectGrid = document.querySelector('.project-grid');
  projectGrid.innerHTML = ''; // Clear existing content

  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    
    projectCard.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-technologies">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
    `;

    projectGrid.appendChild(projectCard);

    // Add animation
    gsap.from(projectCard, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: projectCard,
        start: "top bottom",
        end: "top center",
        toggleActions: "play none none reverse"
      }
    });
  });
}

// Navigation
function moveCamera(x, y, z) {
  gsap.to(camera.position, {
    x,
    y,
    z,
    duration: 2,
    ease: "power2.inOut"
  });
}

document.querySelectorAll('nav button').forEach(button => {
  button.addEventListener('click', () => {
    const section = button.dataset.section;
    
    // Hide all sections first
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    
    // Show the selected section
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.classList.remove('hidden');
      if (section === 'projects') {
        initializeProjects();
      }
    }
    
    // Move camera based on section
    switch(section) {
      case 'home':
        moveCamera(0, 0, 30);
        break;
      case 'projects':
        moveCamera(-30, 0, 50);
        break;
      case 'contact':
        moveCamera(30, 0, 50);
        break;
      case 'resume':
        moveCamera(0, -20, 50);
        break;
    }
  });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', () => {
  document.body.setAttribute('data-theme', themeToggle.checked ? 'light' : 'dark');
});

// Contact Form
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  // Add your form submission logic here
  alert('Message sent! (Demo)');
});

// Certificate Viewer
document.querySelectorAll('.view-certificate').forEach(button => {
  button.addEventListener('click', () => {
    const certificateUrl = button.parentElement.dataset.certificate;
    window.open(certificateUrl, '_blank');
  });
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate stars
  scene.children.forEach(child => {
    if (child instanceof THREE.Mesh) {
      child.rotation.x += 0.001;
      child.rotation.y += 0.001;
    }
  });

  renderer.render(scene, camera);
}

// Handle Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start Animation
animate();

// Initial Animation
gsap.from('#name', {
  opacity: 0,
  y: -50,
  duration: 1,
  delay: 0.5
});

gsap.from('#tagline', {
  opacity: 0,
  y: -30,
  duration: 1,
  delay: 0.8
});

// Animate timeline items
document.querySelectorAll('.timeline-item').forEach((item, index) => {
  gsap.from(item, {
    opacity: 0,
    x: -50,
    duration: 0.8,
    delay: 0.2 * index,
    scrollTrigger: {
      trigger: item,
      start: "top bottom",
      end: "top center",
      toggleActions: "play none none reverse"
    }
  });
});

// Animate skill cards
document.querySelectorAll('.skill-card').forEach((card, index) => {
  gsap.from(card, {
    opacity: 0,
    y: 30,
    duration: 0.5,
    delay: 0.1 * index,
    scrollTrigger: {
      trigger: card,
      start: "top bottom",
      end: "top center",
      toggleActions: "play none none reverse"
    }
  });
});

// Add animations for service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
  gsap.from(card, {
    opacity: 0,
    y: 30,
    duration: 0.5,
    delay: 0.1 * index,
    scrollTrigger: {
      trigger: card,
      start: "top bottom",
      end: "top center",
      toggleActions: "play none none reverse"
    }
  });
});