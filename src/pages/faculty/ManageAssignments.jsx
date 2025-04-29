
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '../../components/Layout';

const ManageAssignments = () => {
  const { user } = useAuth();
  const { getFacultyCourses, getAssignmentsForCourse } = useData();
  
  const courses = getFacultyCourses(user.id);
  const [selectedCourseId, setSelectedCourseId] = useState(courses.length > 0 ? courses[0].id : '');
  
  const assignments = selectedCourseId ? getAssignmentsForCourse(selectedCourseId) : [];
  const selectedCourse = courses.find(c => c.id === selectedCourseId);
  
  return (
    <Layout requiredRole="faculty">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Assignments</h1>
          <p className="text-gray-600">Create and manage assignments for your courses</p>
        </div>
        
        {courses.length > 0 ? (
          <>
            <Card>
              <CardContent className="py-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-1/3">
                    <label className="text-sm font-medium mb-1 block">Select Course</label>
                    <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map(course => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedCourse && (
                    <div className="mt-4 md:mt-0 md:flex-1 flex justify-end">
                      <Link to={`/faculty/course/${selectedCourseId}/assignments/create`}>
                        <Button>Create New Assignment</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {selectedCourse && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Assignments for {selectedCourse.name} ({selectedCourse.code})
                </h2>
                
                {assignments.length > 0 ? (
                  <div className="space-y-4">
                    {assignments.map(assignment => (
                      <Card key={assignment.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                              <h3 className="font-medium">{assignment.title}</h3>
                              <div className="text-sm text-gray-500 mt-1">
                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="mt-4 md:mt-0">
                              <Button variant="outline" size="sm">View Submissions</Button>
                            </div>
                          </div>
                          
                          <div className="mt-4 text-sm">
                            <p className="line-clamp-2">{assignment.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-gray-50 rounded-md">
                    <p className="text-gray-500 mb-4">No assignments created for this course yet.</p>
                    <Link to={`/faculty/course/${selectedCourseId}/assignments/create`}>
                      <Button>Create Your First Assignment</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500 mb-6">You haven't created any courses yet.</p>
              <Link to="/faculty/create-course">
                <Button>Create Your First Course</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default ManageAssignments;
