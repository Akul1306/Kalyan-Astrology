export async function verifyRecaptcha(token) {
    try {
        const secret = process.env.RECAPTCHA_SECRET_KEY;
        if (!secret)
            return true; // Not enforced if no secret is set
        if (!token)
            return false;
        const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ secret, response: token }),
        });
        const data = (await res.json());
        if (!data.success)
            return false;
        if (typeof data.score === "number" && data.score < 0.3)
            return false;
        return true;
    }
    catch {
        return false;
    }
}
