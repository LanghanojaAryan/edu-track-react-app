
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Layout from '../../components/Layout';

const AssignmentDetails = () => {
  const { assignmentId } = useParams();
  const { assignments, courses } = useData();
  
  const assignment = assignments.find(a => a.id === assignmentId);
  
  if (!assignment) {
    return (
      <Layout requiredRole="student">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Assignment not found</h2>
          <p className="mb-4">The assignment you're looking for doesn't exist or has been removed.</p>
          <Link to="/student/assignments">
            <Button variant="outline">Go back to assignments</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const course = courses.find(c => c.id === assignment.courseId);
  
  return (
    <Layout requiredRole="student">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-sm mb-2">
            <Link to="/student/courses" className="text-blue-600 hover:underline">
              My Courses
            </Link>
            <span>/</span>
            {course && (
              <>
                <Link to={`/student/course/${course.id}`} className="text-blue-600 hover:underline">
                  {course.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-600">Assignment</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{assignment.title}</h1>
          <p className="text-gray-600">
            Due: {new Date(assignment.dueDate).toLocaleDateString()}
            {course && ` • ${course.name} (${course.code})`}
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
            <CardDescription>
              Total Marks: {assignment.totalMarks}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{assignment.description}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Submission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center py-8 text-gray-500">
              You haven't submitted this assignment yet.
            </p>
            <div className="flex justify-center">
              <Button>Upload Submission</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AssignmentDetails;
