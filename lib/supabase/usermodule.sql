-- Create a table to track user progress through the Notion modules
CREATE TABLE public.user_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  module_id text NOT NULL,
  status text NOT NULL DEFAULT 'completed',
  completed_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  
  -- Ensure a user can only have one progress record per module
  UNIQUE(user_id, module_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can perfectly read their own progress
CREATE POLICY "Users can read their own progress" 
ON public.user_progress
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy: Users can insert their own progress
CREATE POLICY "Users can insert their own progress" 
ON public.user_progress
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own progress
CREATE POLICY "Users can update their own progress" 
ON public.user_progress
FOR UPDATE 
USING (auth.uid() = user_id);