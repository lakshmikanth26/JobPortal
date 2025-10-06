import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, Download, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react';

const ResumeViewer = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    // In a real app, fetch user data from API
    // For now, generate mock data based on userId
    const mockCandidates = {
      '1': {
        fullName: 'Alice Johnson',
        email: 'alice@test.com',
        phone: '9876543211',
        location: 'Bangalore, India',
        bio: 'Experienced Java developer with 5 years of experience in Spring Boot and microservices',
        skills: ['Java', 'Spring Boot', 'MySQL', 'REST APIs', 'Docker', 'Kubernetes', 'Microservices'],
        experience: [
          {
            title: 'Senior Java Developer',
            company: 'Tech Solutions Pvt Ltd',
            duration: 'Jan 2021 - Present',
            description: 'Leading backend development team, designing and implementing microservices architecture'
          },
          {
            title: 'Java Developer',
            company: 'Innovate IT',
            duration: 'Jun 2019 - Dec 2020',
            description: 'Developed RESTful APIs and integrated third-party services'
          }
        ],
        education: [
          {
            degree: 'B.Tech in Computer Science',
            institution: 'ABC Engineering College',
            year: '2015 - 2019',
            grade: 'CGPA: 8.5/10'
          }
        ],
        projects: [
          {
            name: 'E-commerce Microservices Platform',
            description: 'Built scalable microservices using Spring Boot, Docker, and Kubernetes',
            technologies: ['Spring Boot', 'Docker', 'Kubernetes', 'MySQL', 'Redis']
          },
          {
            name: 'Payment Gateway Integration',
            description: 'Integrated multiple payment gateways with security and transaction management',
            technologies: ['Java', 'REST APIs', 'OAuth2', 'MySQL']
          }
        ]
      },
      '2': {
        fullName: 'Bob Smith',
        email: 'bob@test.com',
        phone: '9876543212',
        location: 'Mumbai, India',
        bio: 'JavaScript fresher, recently graduated with knowledge in React and Node.js',
        skills: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'Git', 'MongoDB'],
        experience: [
          {
            title: 'Frontend Developer Intern',
            company: 'StartupXYZ',
            duration: 'Jun 2024 - Aug 2024',
            description: 'Developed responsive web applications using React and Redux'
          }
        ],
        education: [
          {
            degree: 'B.Sc in Computer Science',
            institution: 'XYZ University',
            year: '2020 - 2024',
            grade: 'CGPA: 8.2/10'
          }
        ],
        projects: [
          {
            name: 'Social Media Dashboard',
            description: 'Built a responsive dashboard for social media analytics',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express']
          },
          {
            name: 'E-learning Platform',
            description: 'Created an online learning platform with video streaming',
            technologies: ['React', 'Firebase', 'Material-UI']
          }
        ]
      },
      '3': {
        fullName: 'Carol Davis',
        email: 'carol@test.com',
        phone: '9876543213',
        location: 'Pune, India',
        bio: 'Python developer with 3 years experience in Django and Flask. Worked on multiple web applications.',
        skills: ['Python', 'Django', 'Flask', 'PostgreSQL', 'REST APIs', 'Docker', 'AWS'],
        experience: [
          {
            title: 'Python Developer',
            company: 'Web Solutions Inc',
            duration: 'Mar 2021 - Present',
            description: 'Developed and maintained Django-based web applications'
          }
        ],
        education: [
          {
            degree: 'M.Sc in Computer Science',
            institution: 'PQR University',
            year: '2018 - 2020',
            grade: 'CGPA: 9.0/10'
          }
        ],
        projects: [
          {
            name: 'CRM System',
            description: 'Built a comprehensive CRM system using Django',
            technologies: ['Django', 'PostgreSQL', 'Celery', 'Redis']
          }
        ]
      },
      '4': {
        fullName: 'David Lee',
        email: 'david@test.com',
        phone: '9876543214',
        location: 'Hyderabad, India',
        bio: 'Full stack developer with 4 years experience. Expert in React, Node.js, and MongoDB.',
        skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'AWS', 'Docker'],
        experience: [
          {
            title: 'Full Stack Developer',
            company: 'Digital Innovations',
            duration: 'Jan 2020 - Present',
            description: 'Leading full stack development with MERN stack'
          }
        ],
        education: [
          {
            degree: 'B.E in Information Technology',
            institution: 'DEF Engineering College',
            year: '2015 - 2019',
            grade: 'CGPA: 8.7/10'
          }
        ],
        projects: [
          {
            name: 'Real-time Chat Application',
            description: 'Built a scalable chat app with WebSocket',
            technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB']
          }
        ]
      },
      '5': {
        fullName: 'Emma Wilson',
        email: 'emma@test.com',
        phone: '9876543215',
        location: 'Bangalore, India',
        bio: 'Java backend developer with 6 years of experience. Specialized in Spring Boot and Kafka.',
        skills: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'Microservices', 'AWS', 'Docker'],
        experience: [
          {
            title: 'Lead Backend Engineer',
            company: 'Enterprise Tech',
            duration: 'Jan 2018 - Present',
            description: 'Architecting and implementing enterprise-grade backend systems'
          }
        ],
        education: [
          {
            degree: 'B.Tech in Computer Science',
            institution: 'GHI Institute of Technology',
            year: '2013 - 2017',
            grade: 'CGPA: 9.2/10'
          }
        ],
        projects: [
          {
            name: 'Event-driven Architecture Platform',
            description: 'Built event-driven system using Kafka and microservices',
            technologies: ['Spring Boot', 'Kafka', 'Redis', 'PostgreSQL']
          }
        ]
      },
      '6': {
        fullName: 'Frank Miller',
        email: 'frank@test.com',
        phone: '9876543216',
        location: 'Chennai, India',
        bio: 'Frontend developer fresher with knowledge of React and Vue.js. Entry level position.',
        skills: ['React', 'Vue.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'Git'],
        experience: [
          {
            title: 'Frontend Developer Intern',
            company: 'Creative Studios',
            duration: 'Jul 2024 - Sep 2024',
            description: 'Developed UI components and responsive designs'
          }
        ],
        education: [
          {
            degree: 'B.Tech in Computer Science',
            institution: 'JKL Engineering College',
            year: '2020 - 2024',
            grade: 'CGPA: 7.8/10'
          }
        ],
        projects: [
          {
            name: 'Portfolio Website',
            description: 'Created responsive portfolio website with animations',
            technologies: ['React', 'Tailwind CSS', 'Framer Motion']
          }
        ]
      }
    };

    setCandidate(mockCandidates[userId] || null);
  }, [userId]);

  const handleDownload = () => {
    // Create a simple PDF-like content
    const content = `
${candidate.fullName}
${candidate.email} | ${candidate.phone} | ${candidate.location}

SUMMARY
${candidate.bio}

SKILLS
${candidate.skills.join(', ')}

EXPERIENCE
${candidate.experience.map(exp => `
${exp.title} at ${exp.company}
${exp.duration}
${exp.description}
`).join('\n')}

EDUCATION
${candidate.education.map(edu => `
${edu.degree}
${edu.institution}, ${edu.year}
${edu.grade}
`).join('\n')}

PROJECTS
${candidate.projects.map(proj => `
${proj.name}
${proj.description}
Technologies: ${proj.technologies.join(', ')}
`).join('\n')}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${candidate.fullName.replace(/\s+/g, '_')}_Resume.txt`;
    a.click();
  };

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Resume Not Found</h1>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={handleDownload}
            className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </Button>
        </div>

        {/* Resume Content */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          {/* Header */}
          <div className="border-b pb-6 mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{candidate.fullName}</h1>
            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{candidate.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{candidate.location}</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{candidate.bio}</p>
          </section>

          {/* Skills */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-6 h-6" />
              Work Experience
            </h2>
            <div className="space-y-4">
              {candidate.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-teal-500 pl-4">
                  <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                  <p className="text-gray-600 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4" />
                    {exp.duration}
                  </p>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <GraduationCap className="w-6 h-6" />
              Education
            </h2>
            <div className="space-y-3">
              {candidate.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-600 font-medium">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                  <p className="text-gray-700">{edu.grade}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Projects</h2>
            <div className="space-y-4">
              {candidate.projects.map((project, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
                  <p className="text-gray-700 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;

