
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '../../components/Layout';
import { toast } from 'sonner';
import { BookOpen, Users } from 'lucide-react';

const BrowseCourses = () => {
  const { user } = useAuth();
  const { courses, getStudentCourses, enrollStudent } = useData();
  
  const enrolledCourses = getStudentCourses(user.id);
  const availableCourses = courses.filter(course => 
    !enrolledCourses.some(ec => ec.id === course.id)
  );
  
  const handleEnroll = (courseId) => {
    enrollStudent(user.id, courseId);
    toast.success('Successfully enrolled in the course!');
  };
  
  return (
    <Layout requiredRole="student">
      <div className="space-y-8">
        <div className="pb-2 border-b">
          <h1 className="text-3xl font-bold mb-2">Browse Courses</h1>
          <p className="text-gray-600">Discover and enroll in available academic courses</p>
        </div>
        
        {availableCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map(course => (
              <Card key={course.id} className="overflow-hidden shadow-sm transition-all hover:shadow-md">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
                  <div className="flex justify-between items-start">
                    <div className="bg-white rounded-md p-2 shadow-sm">
                      <BookOpen className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      {course.code}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{course.name}</h3>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>Faculty: {course.facultyName}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-3">{course.description}</p>
                    
                    <Button 
                      onClick={() => handleEnroll(course.id)}
                      className="w-full"
                    >
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border shadow-sm">
            <CardContent className="py-12 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-2">
                No available courses to enroll in.
              </p>
              <p className="text-sm text-gray-400">
                You've enrolled in all available courses.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default BrowseCourses;
