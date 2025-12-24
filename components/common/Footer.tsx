export default function Footer() {
    return (
        <footer className="border-t py-6 
            bg-gradient-to-br 
            from-indigo-50 to-white 
            dark:from-indigo-950 dark:to-black">
            <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} AI Fitness Coach</p>
                <p>Built with ❤️ using Next.js</p>
            </div>
        </footer>
    );
}
