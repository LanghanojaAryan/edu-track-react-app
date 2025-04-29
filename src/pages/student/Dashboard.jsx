
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Layout from '../../components/Layout';
import { BookOpen, GraduationCap, Calendar, Clock } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { getStudentCourses, courses, getAssignmentsForCourse } = useData();
  
  const enrolledCourses = getStudentCourses(user.id);
  const availableCourses = courses.filter(course => 
    !enrolledCourses.some(ec => ec.id === course.id)
  );
  
  // Get all assignments for enrolled courses
  const upcomingAssignments = enrolledCourses
    .flatMap(course => {
      const assignments = getAssignmentsForCourse(course.id);
      return assignments.map(assignment => ({
        ...assignment,
        courseName: course.name,
        courseCode: course.code
      }));
    })
    .filter(assignment => new Date(assignment.dueDate) >= new Date())
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3); // Show only 3 upcoming assignments
  
  return (
    <Layout requiredRole="student">
      <div className="space-y-8">
        {/* Header section */}
        <div className="pb-2 border-b">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-gray-600">Your academic hub for courses, assignments, and resources</p>
        </div>
        
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-indigo-100">
            <CardContent className="p-6 flex items-center">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <BookOpen className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-indigo-600">Enrolled Courses</p>
                <h3 className="text-2xl font-bold">{enrolledCourses.length}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-emerald-100">
            <CardContent className="p-6 flex items-center">
              <div className="bg-emerald-100 p-3 rounded-full mr-4">
                <GraduationCap className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-600">Available Courses</p>
                <h3 className="text-2xl font-bold">{availableCourses.length}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-yellow-100">
            <CardContent className="p-6 flex items-center">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-600">Upcoming Assignments</p>
                <h3 className="text-2xl font-bold">{upcomingAssignments.length}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Your Courses section */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Your Courses
              </CardTitle>
              <CardDescription>
                Currently enrolled in {enrolledCourses.length} courses
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {enrolledCourses.length > 0 ? (
                <ul className="space-y-3">
                  {enrolledCourses.slice(0, 3).map(course => (
                    <li key={course.id} className="border rounded-md hover:bg-gray-50 transition-colors">
                      <Link to={`/student/course/${course.id}`} className="block p-4">
                        <div className="font-medium text-primary">{course.name}</div>
                        <div className="flex justify-between mt-1">
                          <div className="text-sm text-gray-500">Code: {course.code}</div>
                          <div className="text-sm text-gray-500">Faculty: {course.facultyName}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
                  <Link to="/student/browse-courses">
                    <Button variant="outline" size="sm">Find Courses</Button>
                  </Link>
                </div>
              )}
            </CardContent>
            {enrolledCourses.length > 3 && (
              <CardFooter className="pt-0">
                <Link to="/student/courses" className="w-full">
                  <Button variant="outline" className="w-full">View All Courses</Button>
                </Link>
              </CardFooter>
            )}
          </Card>
          
          {/* Upcoming assignments section */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Upcoming Assignments
              </CardTitle>
              <CardDescription>
                Tasks due in the near future
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {upcomingAssignments.length > 0 ? (
                <ul className="space-y-3">
                  {upcomingAssignments.map(assignment => (
                    <li key={assignment.id} className="border rounded-md hover:bg-gray-50 transition-colors">
                      <Link to={`/student/assignment/${assignment.id}`} className="block p-4">
                        <div className="font-medium text-primary">{assignment.title}</div>
                        <div className="flex justify-between mt-1">
                          <div className="text-sm text-gray-500">
                            Course: {assignment.courseCode}
                          </div>
                          <div className="text-sm font-medium text-amber-600">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No upcoming assignments.</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-0">
              <Link to="/student/assignments" className="w-full">
                <Button variant="outline" className="w-full">View All Assignments</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        {/* Quick actions section */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3 border-b">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Commonly used features and tools</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <Link to="/student/assignments">
                <Button variant="outline">View Assignments</Button>
              </Link>
              <Link to="/student/browse-courses">
                <Button variant="outline">Browse Courses</Button>
              </Link>
              <Link to="/student/courses">
                <Button variant="outline">My Enrolled Courses</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
