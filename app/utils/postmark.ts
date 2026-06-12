export async function sendRecommendationEmail(to: string, userName: string, matchesHtml: string) {
  const token = process.env.POSTMARK_API_TOKEN;
  if (!token) {
    console.warn("POSTMARK_API_TOKEN is not configured. Email notification skipped.");
    return false;
  }

  const payload = {
    From: "notifications@edumatch.ai",
    To: to,
    Subject: `EduMatch AI - Your Personalized Program Recommendation Report`,
    HtmlBody: `
      <h2>Hello ${userName || "Student"},</h2>
      <p>Thank you for completing the EduMatch AI assessment. Here is your personalized recommendation report:</p>
      <div>${matchesHtml}</div>
      <br />
      <p>Best regards,<br />The EduMatch AI Team</p>
    `,
  };

  try {
    const res = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": token,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Postmark API error:", errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send Postmark email:", error);
    return false;
  }
}
