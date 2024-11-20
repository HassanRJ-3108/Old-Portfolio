import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  demoUrl: { type: String, required: true },
  githubUrl: { type: String, required: false },
  year: { type: Number, required: true },
  role: { type: String, required: true },
  order: { type: Number, default: 0 }, // Add this line
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);