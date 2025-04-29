
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '../../components/Layout';

const Assignments = () => {
  const { user } = useAuth();
  const { getStudentCourses, getAssignmentsForCourse } = useData();
  
  const enrolledCourses = getStudentCourses(user.id);
  
  // Get all assignments for enrolled courses
  const allAssignments = enrolledCourses.flatMap(course => {
    const assignments = getAssignmentsForCourse(course.id);
    return assignments.map(assignment => ({
      ...assignment,
      courseName: course.name,
      courseCode: course.code
    }));
  });
  
  // Filter for upcoming assignments (due date in the future)
  const today = new Date();
  const upcomingAssignments = allAssignments.filter(
    assignment => new Date(assignment.dueDate) >= today
  ).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  
  // Filter for past assignments (due date in the past)
  const pastAssignments = allAssignments.filter(
    assignment => new Date(assignment.dueDate) < today
  ).sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  
  const renderAssignmentList = (assignments) => {
    if (assignments.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No assignments found.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {assignments.map(assignment => (
          <Card key={assignment.id}>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="font-medium">{assignment.title}</h3>
                  <div className="text-sm text-gray-500 mt-1">
                    Course: {assignment.courseName} ({assignment.courseCode})
                  </div>
                  <div className="text-sm text-gray-500">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link to={`/student/assignment/${assignment.id}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  return (
    <Layout requiredRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Assignments</h1>
          <p className="text-gray-600">View and manage your assignments</p>
        </div>
        
        {enrolledCourses.length > 0 ? (
          <Tabs defaultValue="upcoming">
            <TabsList>
              <TabsTrigger value="upcoming">
                Upcoming ({upcomingAssignments.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Past ({pastAssignments.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="pt-4">
              {renderAssignmentList(upcomingAssignments)}
            </TabsContent>
            
            <TabsContent value="past" className="pt-4">
              {renderAssignmentList(pastAssignments)}
            </TabsContent>
          </Tabs>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500 mb-6">You haven't enrolled in any courses yet.</p>
              <Link to="/student/browse-courses">
                <Button>Browse Available Courses</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Assignments;
