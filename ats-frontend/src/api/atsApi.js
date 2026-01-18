// In dev, use /api so Vite proxies to backend (avoids CORS). In prod, use explicit URL.
const BASE_URL = import.meta.env.DEV ? "/api" : (import.meta.env.VITE_API_URL || "http://localhost:8000");

export async function parseResume(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${BASE_URL}/parse-resume`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Parse resume error:", response.status, error);
      throw new Error(`Resume parsing failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Parse resume fetch error:", error);
    throw error;
  }
}

export async function atsReview(resumeText, jobDescription) {
  const params = new URLSearchParams();
  params.append("resume_text", resumeText);
  params.append("job_description", jobDescription);

  try {
    const response = await fetch(`${BASE_URL}/ats/review`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("ATS review error:", response.status, error);
      throw new Error(`ATS review failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("ATS review fetch error:", error);
    throw error;
  }
}

export async function atsMatch(resumeText, jobDescription) {
  const params = new URLSearchParams();
  params.append("resume_text", resumeText);
  params.append("job_description", jobDescription);

  try {
    const response = await fetch(`${BASE_URL}/ats/match`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("ATS match error:", response.status, error);
      throw new Error(`ATS match failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("ATS match fetch error:", error);
    throw error;
  }
}

export async function resumeImprove(resumeText, jobDescription) {
  const params = new URLSearchParams();
  params.append("resume_text", resumeText);
  params.append("job_description", jobDescription);

  try {
    const response = await fetch(`${BASE_URL}/resume/improve`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resume improve error:", response.status, error);
      throw new Error(`Resume improvement failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Resume improve fetch error:", error);
    throw error;
  }
}

export async function skillsGap(resumeText, jobDescription) {
  const params = new URLSearchParams();
  params.append("resume_text", resumeText);
  params.append("job_description", jobDescription);

  try {
    const response = await fetch(`${BASE_URL}/career/skills-gap`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Skills gap error:", response.status, error);
      throw new Error(`Skills gap analysis failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Skills gap fetch error:", error);
    throw error;
  }
}

export async function interviewPrep(resumeText, jobDescription) {
  const params = new URLSearchParams();
  params.append("resume_text", resumeText);
  params.append("job_description", jobDescription);

  try {
    const response = await fetch(`${BASE_URL}/career/interview-prep`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Interview prep error:", response.status, error);
      throw new Error(`Interview prep failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Interview prep fetch error:", error);
    throw error;
  }
}

export async function salaryNegotiation(resumeText, jobDescription, location = null) {
  const params = new URLSearchParams();
  params.append("resume_text", resumeText);
  params.append("job_description", jobDescription);
  if (location) {
    params.append("location", location);
  }

  try {
    const response = await fetch(`${BASE_URL}/career/salary`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Salary negotiation error:", response.status, error);
      throw new Error(`Salary negotiation failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Salary negotiation fetch error:", error);
    throw error;
  }
}
