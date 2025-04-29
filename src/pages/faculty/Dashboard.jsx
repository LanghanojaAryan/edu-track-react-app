
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Layout from '../../components/Layout';

const FacultyDashboard = () => {
  const { user } = useAuth();
  const { getFacultyCourses, getEnrolledStudents } = useData();
  
  const myCourses = getFacultyCourses(user.id);
  
  return (
    <Layout requiredRole="faculty">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-gray-600">Manage your courses and assignments from your faculty dashboard</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Courses</CardTitle>
              <CardDescription>
                You have {myCourses.length} courses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {myCourses.length > 0 ? (
                <ul className="space-y-2">
                  {myCourses.slice(0, 3).map(course => (
                    <li key={course.id} className="border rounded-md p-3">
                      <div className="font-medium">{course.name}</div>
                      <div className="text-sm text-gray-500">
                        {getEnrolledStudents(course.id).length} students enrolled
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">You haven't created any courses yet.</p>
              )}
            </CardContent>
            <CardFooter>
              <Link to="/faculty/courses">
                <Button variant="outline">View All Courses</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage your teaching activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/faculty/create-course" className="block">
                <Button className="w-full">Create New Course</Button>
              </Link>
              <Link to="/faculty/assignments" className="block">
                <Button variant="outline" className="w-full">Manage Assignments</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FacultyDashboard;
