
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Layout from '../../components/Layout';

const CreateAssignment = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses, addAssignment } = useData();
  
  const course = courses.find(c => c.id === courseId);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    totalMarks: 100,
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const assignment = {
      ...formData,
      courseId,
      courseName: course?.name || '',
      createdAt: new Date().toISOString()
    };
    
    addAssignment(assignment);
    navigate(`/faculty/course/${courseId}`);
  };
  
  if (!course) {
    return (
      <Layout requiredRole="faculty">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Course not found</h2>
          <p className="mb-4">The course you're trying to create an assignment for doesn't exist.</p>
          <Link to="/faculty/courses">
            <Button variant="outline">Go back to courses</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout requiredRole="faculty">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-sm mb-2">
            <Link to="/faculty/courses" className="text-blue-600 hover:underline">
              My Courses
            </Link>
            <span>/</span>
            <Link to={`/faculty/course/${courseId}`} className="text-blue-600 hover:underline">
              {course.name}
            </Link>
            <span>/</span>
            <span className="text-gray-600">New Assignment</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Assignment</h1>
          <p className="text-gray-600">For {course.name} ({course.code})</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Assignment Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Midterm Project"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide details about the assignment"
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input
                    id="totalMarks"
                    name="totalMarks"
                    type="number"
                    min="1"
                    value={formData.totalMarks}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="pt-4 flex gap-2">
                <Button type="submit">Create Assignment</Button>
                <Link to={`/faculty/course/${courseId}`}>
                  <Button variant="outline" type="button">Cancel</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateAssignment;
