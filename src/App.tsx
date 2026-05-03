import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom';
import './App.css'
import RootLayout from './layout/RootLayout';
import NotFound from './pages/NotFound';
import ProtectedLayout from './layout/ProtectedLayout';
import LoginPage from './pages/LoginPage';
import Review from './pages/Review';
import Profile from './pages/Profile';
import QuizPage from './pages/QuizPage';
import LearningCompletedPage from './pages/LearningCompletedPage';
import CardLearningPage from './pages/CardLearningPage';
import OnboardingPage from './pages/OnboardingPage';
import ReviewCardPage from './pages/ReviewCardPage';
import HomePage from './pages/Home/HomePage';
import TodayLearnPage from './pages/TodayLearnPage';
import LibraryPage from './pages/Library/LibraryPage';
import ReviewCompletedPage from './pages/ReviewCompletedPage';
import OAuthCallbackPage from './pages/OAuthCallbackPage';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'auth/callback',
        element: <OAuthCallbackPage />,
      },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      
      },
      {
        path: "review",
        element: <Review />,
      },
      {
        path: "library",
        element: <LibraryPage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "Quiz",
        element: <QuizPage />
      },
      {
        path: "learningCompleted",
        element: <LearningCompletedPage/>
      },
      {
        path: "cardlearning",
        element: <CardLearningPage />,
      },
      {
        path:"onboarding",
        element: <OnboardingPage />,
      },
      {
        path: "reviewcard",
        element: <ReviewCardPage />,
      },
      {
        path: "todaylearn",
        element: <TodayLearnPage />,
      },
      {
        path: "reviewCompletedPage",
        element: <ReviewCompletedPage />
      }
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;