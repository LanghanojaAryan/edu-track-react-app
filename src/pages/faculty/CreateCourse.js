
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Layout from '../../components/Layout';

const CreateCourse = () => {
  const { user } = useAuth();
  const { addCourse } = useData();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const course = {
      ...formData,
      facultyId: user.id,
      facultyName: user.name,
      createdAt: new Date().toISOString()
    };
    
    addCourse(course);
    navigate('/faculty/courses');
  };
  
  return (
    <Layout requiredRole="faculty">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Create New Course</h1>
          <p className="text-gray-600">Fill in the details to create a new course</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Course Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Introduction to Computer Science"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="code">Course Code</Label>
                <Input
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g., CS101"
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
                  placeholder="Provide a brief description of the course"
                  rows={4}
                  required
                />
              </div>
              
              <div className="pt-4">
                <Button type="submit">Create Course</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateCourse;
