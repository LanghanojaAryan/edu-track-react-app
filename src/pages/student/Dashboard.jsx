
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Layout from '../../components/Layout';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { getStudentCourses, courses } = useData();
  
  const enrolledCourses = getStudentCourses(user.id);
  const availableCourses = courses.filter(course => 
    !enrolledCourses.some(ec => ec.id === course.id)
  );
  
  return (
    <Layout requiredRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-gray-600">Access your courses and assignments from your student dashboard</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Courses</CardTitle>
              <CardDescription>
                You are enrolled in {enrolledCourses.length} courses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {enrolledCourses.length > 0 ? (
                <ul className="space-y-2">
                  {enrolledCourses.slice(0, 3).map(course => (
                    <li key={course.id} className="border rounded-md p-3">
                      <div className="font-medium">{course.name}</div>
                      <div className="text-sm text-gray-500">Code: {course.code}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
              )}
            </CardContent>
            <CardFooter>
              <Link to="/student/courses">
                <Button variant="outline">View All Courses</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Available Courses</CardTitle>
              <CardDescription>
                {availableCourses.length} courses available for enrollment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {availableCourses.length > 0 ? (
                <ul className="space-y-2">
                  {availableCourses.slice(0, 3).map(course => (
                    <li key={course.id} className="border rounded-md p-3">
                      <div className="font-medium">{course.name}</div>
                      <div className="text-sm text-gray-500">Code: {course.code}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No available courses to enroll in.</p>
              )}
            </CardContent>
            <CardFooter>
              <Link to="/student/browse-courses">
                <Button variant="outline">Browse All Courses</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Link to="/student/assignments">
              <Button variant="outline">View Assignments</Button>
            </Link>
            <Link to="/student/browse-courses">
              <Button variant="outline">Browse Courses</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
