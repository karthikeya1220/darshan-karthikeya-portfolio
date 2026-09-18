import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "hirenexa",
    title: "HireNexa",
    period: {
      start: "01.2025",
      end: "09.2025",
    },
    link: "https://github.com/karthikeya1220/HireNexa",
    skills: [
      "Full Stack",
      "Applied AI",
      "Next.js",
      "Gemini AI",
      "MERN Stack",
      "ATS",
    ],
    description: `Gemini-powered ATS for end-to-end recruitment automation. Reduced manual screening by 65%.
- Built AI resume screening system using Gemini AI
- Automated candidate matching and ranking
- Integrated with existing recruitment workflows`,
    isExpanded: true,
  },
  {
    id: "ui-flow",
    title: "UI Flow",
    period: {
      start: "06.2025",
    },
    link: "https://github.com/karthikeya1220/UI-Flow",
    skills: [
      "AI Developer Tooling",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Wireframe-to-Code",
    ],
    description: `AI platform converting wireframes into production-ready React + Tailwind code. 70% faster UI dev.
- Automated wireframe-to-code conversion
- Generated production-ready React components`,
  },
  {
    id: "marketglimpse",
    title: "MarketGlimpse",
    period: {
      start: "03.2025",
    },
    link: "https://github.com/karthikeya1220/MarketGlimpse",
    skills: [
      "FinTech",
      "Next.js",
      "Real-time Analytics",
      "Gemini AI",
      "Stock Market",
    ],
    description: `Real-time stock analytics dashboard with Gemini-powered market insights and forecasting.
- Built real-time stock data visualization
- Integrated AI-powered market analysis`,
  },
  {
    id: "getit",
    title: "GetIt",
    period: {
      start: "08.2024",
    },
    link: "https://github.com/karthikeya1220/GetIt",
    skills: [
      "Marketplace",
      "React",
      "AI Skill Matching",
      "Razorpay",
      "Full Stack",
    ],
    description: `Student freelancing platform with AI skill matching and integrated Razorpay payments.
- Built AI-powered skill matching system
- Integrated Razorpay payment gateway`,
  },
  {
    id: "iuwo-segmentation",
    title: "IUWO-segmentation",
    period: {
      start: "06.2025",
      end: "07.2025",
    },
    link: "https://github.com/karthikeya1220/iuwo-segmentation",
    skills: [
      "Research",
      "Applied AI",
      "Python",
      "Medical Imaging",
      "Brain Tumor Segmentation",
    ],
    description: `Impact-Weighted Uncertainty Optimization (IWUO) for expert-in-the-loop brain tumor segmentation. Selects axial slices that maximize impact of limited expert corrections.
- IEEE Publication at TENCON 2026
- Novel approach to medical image segmentation`,
  },
  {
    id: "churn-prediction",
    title: "Churn Prediction with SHAP",
    period: {
      start: "04.2025",
    },
    link: "https://github.com/karthikeya1220/Churn-Prediction-with-SHAP",
    skills: [
      "Data Science",
      "Python",
      "XGBoost",
      "SHAP",
      "Explainable ML",
    ],
    description: `Explainable ML pipeline for customer churn prediction using XGBoost and SHAP analysis.
- Built interpretable machine learning pipeline
- Implemented SHAP for model explainability`,
  },
]
