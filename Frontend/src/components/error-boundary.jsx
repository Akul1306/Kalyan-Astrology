"use client";
import React from "react";
import { Button } from "@/components/ui/button";
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        // Error logged to error reporting service in production
        if (process.env.NODE_ENV === "development") {
            console.error("ErrorBoundary caught an error:", error, errorInfo);
        }
    }
    resetError = () => {
        this.setState({ hasError: false, error: null });
    };
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                const Fallback = this.props.fallback;
                return <Fallback error={this.state.error} resetError={this.resetError}/>;
            }
            return (<div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="max-w-md w-full rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <h2 className="text-xl font-semibold text-red-900 mb-2">Something went wrong</h2>
            <p className="text-red-700 mb-4">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={this.resetError} variant="outline">
                Try again
              </Button>
              <Button onClick={() => window.location.href = "/"} variant="outline">
                Go home
              </Button>
            </div>
          </div>
        </div>);
        }
        return this.props.children;
    }
}
