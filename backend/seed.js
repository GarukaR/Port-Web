const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./models/Project');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const seedData = async () => {
  try {
    console.log('🌱 Seeding database...');

    // Clear existing data
    await Project.deleteMany({});

    // Create projects
    const projects = [
      {
        title: "Voice-Based Medical History Taker",
        description: "AI-powered secure data workflow using Gemini AI, Python, and MongoDB on AWS. Privacy-focused with scalable architecture.",
        technologies: ["Python", "AI", "MongoDB", "AWS", "Privacy"],
        type: "AI + Cloud",
        duration: "Jul 2024 – Jun 2025",
        status: "completed",
        achievements: [
          "5 client presentations delivered",
          "Audit-ready documentation created",
          "HIPAA-compliant design implemented"
        ],
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center",
        featured: true,
        order: 1,
        visible: true
      },
      {
        title: "Booking Website Optimization",
        description: "UX analysis and optimization for Mildura Grand Hotel's booking system. Delivered 13 actionable improvements using AI tools.",
        technologies: ["UX/UI", "ChatGPT", "Claude", "Analytics"],
        type: "Web Optimization",
        duration: "Feb 2024 – Apr 2024",
        status: "completed",
        achievements: [
          "13 UX improvements implemented",
          "SummerTech Live recognition received",
          "35% conversion rate improvement"
        ],
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop&crop=center",
        featured: true,
        order: 2,
        visible: true
      },
      {
        title: "SEO Performance Enhancement",
        description: "Conducted comprehensive SEO audits resolving 148+ issues, improving performance by ~20% for Australian market.",
        technologies: ["SEO", "Google Console", "Performance", "Analytics"],
        type: "Web Development",
        duration: "Apr 2025 – Present",
        status: "ongoing",
        achievements: [
          "148+ technical issues resolved",
          "20% performance improvement",
          "Australian market localization"
        ],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
        featured: true,
        order: 3,
        visible: true
      }
    ];

    for (const projectData of projects) {
      const project = new Project(projectData);
      await project.save();
    }

    console.log('✅ Database seeded successfully!');
    console.log(`📊 Created ${projects.length} projects`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();