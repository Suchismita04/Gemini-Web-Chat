import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



const handler = NextAuth({
    providers: [
        CredentialsProvider({

            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const res = await fetch("http://127.0.0.1:8000/api/v1/user/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })


                })
                const data = await res.json()
                console.log("data from auth:",data)
                if (!res.ok || !data.token) {
                    return null
                }

                return {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    accessToken: data.token
                };
            }
        })
    ],

    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.accessToken = token.accessToken as string;
            return session;
        }
    },



    pages: {
        signIn: "/login"
    },

})


export {handler as GET, handler as POST}